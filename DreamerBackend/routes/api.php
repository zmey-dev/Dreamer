<?php
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ProjectController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/users/{id}', [UserController::class, 'show']);

    Route::put('/myprofile', [AuthController::class, 'updateProfile']);
    Route::put('/password', [AuthController::class, 'updatePassword']);

    Route::post('/reviews/user', [ReviewController::class, 'storeToUser']);

    Route::get('/reviews', [ReviewController::class, 'index']); // that I gave
    Route::get('/myreviews', [ReviewController::class, 'myReview']); //that I recevied
});


Route::middleware(['auth:sanctum', 'role:executive'])->group(function () {
    Route::post('/users', [UserController::class, 'store']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::delete('/users/{id}', [UserController::class, 'destroy']);

    Route::get('/teams', [TeamController::class, 'index']);
    Route::get('/teams/{id}', [TeamController::class, 'show']);
    Route::post('/teams', [TeamController::class, 'store']);
    Route::put('/teams/{id}', [TeamController::class, 'update']);
    Route::delete('/teams/{id}', [TeamController::class, 'destroy']);

    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::post('/projects', [ProjectController::class, 'store']);
    Route::put('/projects/{id}', [ProjectController::class, 'update']);
    Route::delete('/projects/{id}', [ProjectController::class, 'destroy']);

    Route::get('/reviews/{id}', [ReviewController::class, 'show']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);
    Route::post('/reviews/project', [ReviewController::class, 'storeToProject']);
});

Route::middleware(['auth:sanctum', 'role:manager'])->group(function () {
    Route::get('/myteams', [UserController::class, 'getTeamUsers']);
    Route::get('/myteamprojects', [ProjectController::class, 'getProjectsForTeam']);

    Route::put('/myprofile', [UserController::class, 'updateMyProfile']);

    Route::get('/teams/{id}', [TeamController::class, 'show']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);

});

Route::middleware(['auth:sanctum', 'role:user'])->group(function () {
    Route::get('/aboutMeReviews', [ReviewController::class, 'getAboutMeReviews']);

    Route::put('/myprofile', [UserController::class, 'updateMyProfile']);

    Route::get('/myReviews', [ReviewController::class, 'getMyReviews']);
    Route::put('/reviews/{id}', [ReviewController::class, 'update']);
    Route::delete('/reviews/{id}', [ReviewController::class, 'destroy']);

    Route::get('/teamProjectReviews/{projectId}', [ReviewController::class, 'getTeamProjectReviews']);

    // Route::get('/projects', [ProjectController::class, 'getProjectsForAdvisor']);
});
