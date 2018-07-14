<?php

/**
 * Authenticate
 */
Route::post('/authenticate', ['as' => 'api.authenticate', 'uses' => 'Api\AuthenticateController@handler'])->middleware(['guest']);

/**
 * Register
 */
Route::post('/register', ['as' => 'api.register', 'uses' => 'Api\RegisterController@handler'])->middleware(['guest']);
