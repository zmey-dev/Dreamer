<?php
namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // Get all teams
    public function index()
    {
        $teams = Team::with('manager', 'members')->get();
        return response()->json(['teams' => $teams]);
    }

    // Create a team
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'manager_id' => 'required|exists:users,id',
            'member_ids' => 'array',
            'member_ids.*' => 'exists:users,id'
        ]);

        $team = Team::create([
            'name' => $request->name,
            'manager_id' => $request->manager_id
        ]);

        User::whereIn('id', $request->member_ids)->update(['team_id' => $team->id]);
        User::find($request->manager_id)->update(['team_id' => $team->id]);

        $team->load('manager', 'members');

        return response()->json(['message' => 'Team created successfully', 'team' => $team]);
    }

    // Update a team
    public function update(Request $request, $id)
    {
        $team = Team::find($id);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $request->validate([
            'name' => 'string|max:255',
            'manager_id' => 'exists:users,id',
            'member_ids' => 'array',
            'member_ids.*' => 'exists:users,id'
        ]);

        $team->update([
            'name' => $request->name ?? $team->name,
            'manager_id' => $request->manager_id ?? $team->manager_id
        ]);

        User::find($team->manager_id)->update(['team_id' => null]);
        User::find($request->manager_id)->update(['team_id' => $team->id]);

        if ($request->member_ids) {
            User::where('team_id', $team->id)->update(['team_id' => null]);
            User::whereIn('id', $request->member_ids)->update(['team_id' => $team->id]);
        }

        $team->load('manager', 'members');

        return response()->json(['message' => 'Team updated successfully', 'team' => $team]);
    }

    // Get a single team
    public function show($id)
    {
        $team = Team::with('manager', 'members')->find($id);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }
        return response()->json($team);
    }

    // Delete a team
    public function destroy($id)
    {
        $team = Team::find($id);
        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }
        $team->delete();
        return response()->json(['message' => 'Team deleted successfully', 'team' => $team]);
    }
}
