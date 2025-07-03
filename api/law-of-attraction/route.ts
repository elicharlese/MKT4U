import { NextRequest } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database';
import { 
  handleApiError, 
  createSuccessResponse, 
  ValidationError,
  ExternalServiceError 
} from '@/lib/errors';
import { validateRequest } from '@/lib/errors';
import { requireAuth } from '@/lib/auth';
import { applyRateLimit } from '@/lib/rate-limit';
import { lawOfAttractionFormSchema } from '@/lib/validations';
import { OpenAI } from 'openai';

const supabase = createClient<Database>(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/**
 * POST /api/law-of-attraction/analyze
 * Analyze law of attraction form and provide recommendations
 */
export async function POST(request: NextRequest) {
  try {
    await applyRateLimit(request, 'ai');
    const user = await requireAuth()(request);

    const body = await request.json();
    const formData = validateRequest(lawOfAttractionFormSchema, body);

    // Generate AI analysis using OpenAI
    const analysisPrompt = `
You are an expert life coach specializing in the Law of Attraction. Analyze the following user input and provide:

1. A comprehensive analysis of their current situation and goals
2. Specific, actionable recommendations
3. Personalized affirmations (5-7 items)
4. Concrete action steps they can take (5-10 items)
5. A manifestation score from 1-100 based on their clarity and alignment

User Input:
- Goals: ${formData.goals}
- Current Situation: ${formData.current_situation}
- Desired Outcome: ${formData.desired_outcome}
- Limiting Beliefs: ${formData.limiting_beliefs || 'None specified'}
- Existing Affirmations: ${formData.affirmations?.join(', ') || 'None specified'}
- Visualization: ${formData.visualization_description || 'None specified'}
- Timeline: ${formData.timeline || 'Not specified'}

Provide your response in the following JSON format:
{
  "analysis": "Detailed analysis in 2-3 paragraphs",
  "recommendations": ["Recommendation 1", "Recommendation 2", ...],
  "affirmations": ["Affirmation 1", "Affirmation 2", ...],
  "action_steps": ["Step 1", "Step 2", ...],
  "score": 85
}
`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: "You are a professional life coach and Law of Attraction expert. Provide practical, encouraging, and specific advice. Always return valid JSON."
          },
          {
            role: "user",
            content: analysisPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      });

      const responseContent = completion.choices[0]?.message?.content;
      if (!responseContent) {
        throw new ExternalServiceError('Failed to generate analysis');
      }

      let analysisResult;
      try {
        analysisResult = JSON.parse(responseContent);
      } catch (parseError) {
        throw new ExternalServiceError('Invalid analysis response format');
      }

      // Save analysis to database
      const { data, error } = await supabase
        .from('law_of_attraction_analyses')
        .insert({
          user_id: user.id,
          form_data: formData,
          analysis_results: analysisResult,
          score: analysisResult.score || 50,
          recommendations: analysisResult.recommendations || [],
        })
        .select()
        .single();

      if (error) {
        throw new ValidationError(error.message);
      }

      return createSuccessResponse(
        {
          id: data.id,
          analysis: analysisResult.analysis,
          recommendations: analysisResult.recommendations,
          affirmations: analysisResult.affirmations,
          action_steps: analysisResult.action_steps,
          score: analysisResult.score,
          created_at: data.created_at,
        },
        'Analysis completed successfully'
      );
    } catch (openaiError) {
      console.error('OpenAI API error:', openaiError);
      throw new ExternalServiceError('AI analysis service temporarily unavailable');
    }
  } catch (error) {
    return handleApiError(error);
  }
}

/**
 * GET /api/law-of-attraction/history
 * Get user's analysis history
 */
export async function GET(request: NextRequest) {
  try {
    await applyRateLimit(request);
    const user = await requireAuth()(request);

    const { data, error } = await supabase
      .from('law_of_attraction_analyses')
      .select('id, analysis_results, score, created_at')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw new ValidationError(error.message);
    }

    return createSuccessResponse(data, 'Analysis history retrieved successfully');
  } catch (error) {
    return handleApiError(error);
  }
}
