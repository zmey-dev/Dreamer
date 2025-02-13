<?php
namespace App\Http\Controllers;

use App\Models\InternalAdvisor;
use App\Models\Project;
use Auth;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // Get all projects
    public function index()
    {
        return response()->json(['projects' => Project::with('creator', 'teams')->get()]);
    }

    //Get all projects for a advisor
    public function getProjectsForAdvisor()
    {
        $projects = InternalAdvisor::find(Auth::user()->id())->projects;
        return response()->json($projects);
    }

    //Get all projects for a team
    public function getProjectsForTeam()
    {
        $team = Auth::user()->team;
        if (!$team) {
            return response()->json(['message' => 'User does not belong to any team'], 404);
        }

        $projects = $team->projects;
        return response()->json(['projects' => $projects]);
    }

    // Create a project
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'team_ids' => 'array',
            'team_ids.*' => 'exists:teams,id'
        ]);

        $project = Project::create([
            'name' => $request->name,
            'description' => $request->description,
            'created_by' => Auth::user()->id
        ]);

        $project->teams()->attach($request->team_ids);

        $project->load('creator', 'teams');

        return response()->json(['message' => 'Project created successfully', 'project' => $project]);
    }

    // Get a single project
    public function show($id)
    {
        $project = Project::with('creator', 'teams')->find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }
        return response()->json($project);
    }

    // Update a project
    public function update(Request $request, $id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $request->validate([
            'name' => 'string|max:255',
            'description' => 'string',
            'team_ids' => 'array',
            'team_ids.*' => 'exists:teams,id'
        ]);

        $project->update([
            'name' => $request->name ?? $project->name,
            'description' => $request->description ?? $project->description
        ]);

        $project->teams()->sync($project->team_ids);
        $project->teams()->attach($request->team_ids);

        $project->load('creator', 'teams');

        return response()->json(['message' => 'Project updated successfully', 'project' => $project]);
    }

    // Delete a project
    public function destroy($id)
    {
        $project = Project::find($id);
        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }
        $project->delete();
        return response()->json(['message' => 'Project deleted successfully', 'project' => $project]);
    }
}
