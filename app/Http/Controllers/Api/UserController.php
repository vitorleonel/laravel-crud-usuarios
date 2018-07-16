<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\User\StoreRequest;
use App\Http\Controllers\Controller;

use App\User;
use App\Http\Resources\User\UserResource;
use App\Http\Resources\User\UserResourceCollection;

class UserController extends Controller
{
	/**
	 * UserController constructor.
	 */
	public function __construct()
	{
		$this->middleware('isAdmin')->except(['show', 'update']);
	}

	/**
	 * Retrieve all users.
	 */
	public function index() {
		$users = User::all();

		return new UserResourceCollection($users);
	}

	/**
	 * Retrieve a user.
	 */
	public function show(int $id) {
		$user = User::find($id);

		if(! $user) {
			return response()->json([
				'message' => 'User not found.'
			], 404);
		}

		return new UserResource($user);
	}

	/**
	 * Create a user.
	 *
	 * @param StoreRequest $request
	 */
	public function store(StoreRequest $request)
	{
		$data = $request->only(['name', 'email', 'password']);
		$user = User::create($data);

		return response()->json(null, 201);
	}

	/**
	 * Update a user.
	 */
	public function update(int $id, Request $request) {
		$user = User::find($id);

		if(! $user) {
			return response()->json([
				'message' => 'User not found.'
			], 404);
		}

		$user->fill($request->all());
		$saved = $user->save();

		if($saved) {
			return response()->json([
				'message' => 'User updated.'
			], 204);
		}

		return response()->json([
			'message' => 'User not updated. Try again!'
		], 400);
	}

	/**
	 * Remove a user.
	 */
    public function destroy(int $id) {
		$user = User::find($id);

		if(! $user || $user->is_admin) {
			return response()->json([
				'message' => 'User not found.'
			], 404);
		}

		$deleted = $user->delete();

		if($deleted) {
			return response()->json(null, 204);
		}

		return response()->json([
			'message' => 'User not deleted. Try again!'
		], 400);
	}
}
