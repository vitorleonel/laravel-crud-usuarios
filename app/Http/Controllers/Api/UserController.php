<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Requests\User\StoreRequest;
use App\Http\Controllers\Controller;

use App\User;

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
		return User::all();
	}

	/**
	 * Retrieve a user.
	 */
	public function show(int $id) {
		$user = User::findOrFail($id);

		return $user;
	}

	/**
	 * Create a user.
	 *
	 * @param StoreRequest $request
	 */
	public function store(StoreRequest $request)
	{
		$data = $request->only(['name', 'email', 'password']);

		return User::create($data);
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

		if($user) {
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

		if(! $user) {
			return response()->json([
				'message' => 'User not found.'
			], 404);
		}

		$user->delete();
	}
}
