<?php

namespace App\Http\Controllers;

use App\Models\InternalAdvisor;
use App\Models\Project;
use App\Models\Review;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    //Get all reviews that I gave
    public function index()
    {
        // Assuming you have a way to get the current user's role
        $user = auth()->user();

        $reviews = Review::where('reviewer_id', $user->id)
            ->with('reviewee', 'project')
            ->get();

        return response()->json(['reviews' => $reviews]);
    }

    //Get all reviews that I received
    public function myReview()
    {
        // Assuming you have a way to get the current user's role
        $user = auth()->user();

        $reviews = Review::where('reviewee_id', $user->id)
            ->with('reviewer', 'project')
            ->get();

        if ($user->role !== 'executive') {
            $reviews->each(function ($review) {
                unset($review->reviewer_id);
                unset($review->reviewer);
            });
        }

        return response()->json(['reviews' => $reviews]);
    }

    //Get a single review
    public function show($id)
    {
        $review = Review::find($id)->with('reviewer', 'reviewee', 'project');
        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        $response = $review->toArray();

        // Assuming you have a way to get the current user's role
        $userRole = auth()->user()->role;

        if ($userRole !== 'executive') {
            unset($response['reviewer_id, reviewer']);
        }

        return response()->json($response);
    }

    //Create

    //Get reviews for a user
    public function getReviewsForUser($userId)
    {
        $reviews = Review::where('reviewee_id', $userId)->with('reviewee', 'reviewer')->get();

        // Assuming you have a way to get the current user's role
        $userRole = auth()->user()->role;

        if ($userRole !== 'executive') {
            $reviews->each(function ($review) {
                unset($review->reviewer_id);
                unset($review->reviewer);
            });
        }

        return response()->json($reviews);
    }

    // Get reviews for a project
    public function getReviewsForProject($projectId)
    {
        $reviews = Review::where('project_id', $projectId)->with('project', 'reviewer')->get();

        $userRole = auth()->user()->role;

        if ($userRole !== 'executive') {
            $reviews->each(function ($review) {
                unset($review->reviewer_id);
                unset($review->reviewer);
            });
        }

        return response()->json($reviews);
    }

    //Get all reviews for me
    public function getMyReviews()
    {
        $reviews = Review::where('reviewee_id', auth()->id())->with('reviewee', 'project')->get();

        return response()->json($reviews);
    }

    //Get all reviews by me
    public function getAboutMeReviews()
    {
        $reviews = Review::where('reviewer_id', auth()->id())->get();

        return response()->json($reviews);
    }

    //Get all reviews for my team's a project
    public function getTeamProjectReviews($projectId)
    {
        $userTeamId = auth()->user()->team_id;
        $projectTeamId = Project::find($projectId)->team_id;

        if ($userTeamId !== $projectTeamId) {
            return response()->json(['message' => 'You are not authorized to view reviews for this project'], 403);
        }

        $reviews = Review::where('project_id', $projectId)->with('project')->get();

        return response()->json($reviews);
    }

    //Create a review about a user
    public function storeToUser(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
            'reviewee_id' => 'required|integer',
            'rating' => 'required|integer|between:1,5'
        ]);

        $review = Review::create([
            'content' => $request->content,
            'reviewer_id' => auth()->id(),
            'reviewee_id' => $request->reviewee_id,
            'rating' => $request->rating
        ]);

        return response()->json(['message' => 'Review created successfully', 'review' => $review]);
    }

    //Create a review about a project
    public function storeToProject(Request $request)
    {

        $request->validate([
            'content' => 'required|string',
            'project_id' => 'required|integer',
            'rating' => 'required|integer|between:1,5'
        ]);

        if (InternalAdvisor::where('user_id', auth()->id())->where('project_id', $request->project_id)->count() == 0) {
            return response()->json(['message' => 'You are not authorized to review this project'], 403);
        }

        $review = Review::create([
            'content' => $request->content,
            'reviewer_id' => auth()->id(),
            'project_id' => $request->project_id,
            'rating' => $request->rating
        ]);

        return response()->json(['message' => 'Review created successfully', 'review' => $review]);
    }

    //Update a review
    public function update(Request $request, $id)
    {
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        if ($review->reviewer_id !== auth()->id()) {
            return response()->json(['message' => 'You are not authorized to update this review'], 403);
        }

        $request->validate([
            'content' => 'string',
            'rating' => 'integer|between:1,5'
        ]);

        $review->update([
            'content' => $request->content ?? $review->content,
            'rating' => $request->rating ?? $review->rating
        ]);

        return response()->json(['message' => 'Review updated successfully', 'review' => $review]);
    }

    //Delete a review
    public function destroy($id)
    {
        $review = Review::find($id);
        if (!$review) {
            return response()->json(['message' => 'Review not found'], 404);
        }

        if ($review->reviewer_id !== auth()->id() && auth()->user()->role !== 'executive') {
            return response()->json(['message' => 'You are not authorized to delete this review'], 403);
        }

        $review->delete();

        return response()->json(['message' => 'Review deleted successfully']);
    }

}
