<?php

Route::get('/{any?}', function() {
    return view('admin.index');
})->where('any', '.*');
