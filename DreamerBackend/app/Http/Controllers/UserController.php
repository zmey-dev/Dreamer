<?php
namespace App\Http\Controllers;

use App\Models\User;
use Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // Get all users
    public function index()
    {
        $users = User::where('id', '!=', auth()->id())
            ->with(['team', 'internalAdvisoryProjects', 'reviewsReceived'])
            ->get();

        if (auth()->user()->role !== 'executive') {
            $users->each(function ($user) {
                unset($user->reviews);
            });
        }

        return response()->json(['users' => $users]);
    }

    // Get all users in a team
    public function getTeamUsers()
    {
        $team = auth()->user()->team;
        if (!$team) {
            return response()->json(['message' => 'User does not belong to any team'], 404);
        }

        $users = User::where('team_id', $team->id)
            ->where('id', '!=', auth()->id())
            ->with(['team', 'internalAdvisoryProjects', 'reviewsReceived'])
            ->get();

        return response()->json(['users' => $users]);
    }

    // Create a user
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:users',
            'role' => 'required|in:executive,manager,user'
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('123456'),
            'role' => $request->role,
            'team_id' => null
        ]);
        $user->load(['team', 'internalAdvisoryProjects']);
        return response()->json(['message' => 'User registered successfully', 'user' => $user]);
    }

    // Update a user
    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $data = $request->validate([
            'role' => 'in:executive,manager,user',
            'advisory_project_ids' => 'array',
            'advisory_project_ids.*' => 'exists:projects,id'
        ]);

        $user->update(['role' => $data['role']]);
        $user->internalAdvisoryProjects()->sync($data['advisory_project_ids']);

        $user->load(['team', 'internalAdvisoryProjects']);
        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    // Get a single user
    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        return response()->json($user);
    }

    // Delete a user
    public function destroy($id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }
        $user->delete();
        return response()->json(['message' => 'User deleted successfully', 'user' => $user]);
    }
}
