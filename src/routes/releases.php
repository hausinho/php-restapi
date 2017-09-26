<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;

// Get all albums
$app->get('/api/releases', function(Request $request, Response $response) {

	$sql = "SELECT * FROM releases";
	
	try{
		$db = new db();
		
		$db = $db->connect();
		
		$stmt = $db->query($sql);
		$releases = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;
		echo json_encode($releases);
	   
		
	} catch(PDOException $e) {
		echo '{"error": {"text": '.$e->getMessage().'}';
	}
});

// Get single release
$app->get('/api/releases/{id}', function(Request $request, Response $response) {
	
	$id = $request->getAttribute('id');
	$sql = "SELECT * FROM albums WHERE id = $id";
	
	try{
		$db = new db();
		
		$db = $db->connect();
		
		$stmt = $db->query($sql);
		
		$releases = $stmt->fetchAll(PDO::FETCH_OBJ);
		$db = null;	
		echo json_encode($releases);
	} catch(PDOException $e) {
		echo '{"error": {"text": '.$e->getMessage().'}';
	}
});

// Add release
$app->post('/api/releases/add', function(Request $request, Response $response) {
	
	$band = $request->getParam('band');
	$album = $request->getParam('album');
	$album_cover = $request->getParam('album_cover');
	$release_date = $request->getParam('release_date');
	
	$id = $request->getAttribute('id');
	$sql = "INSERT INTO albums (band, album, album_cover, release_date) VALUES (:band, :album, :album_cover, :release_date)";
	
	try{
		$db = new db();
		
		$db = $db->connect();
		
		$stmt = $db->prepare($sql);
		
		$stmt->bindParam(':band', $band);
		$stmt->bindParam(':album', $album);
		$stmt->bindParam(':album_cover', $album_cover);
		$stmt->bindParam(':release_date', $release_date);
		
		$stmt->execute();
		
		echo '{"notice": {"text": "Album added"}';
	} catch(PDOException $e) {
		echo '{"error": {"text": '.$e->getMessage().'}';
	}
});

// UPDATE
$app->put('/api/releases/update/{id}', function(Request $request, Response $response) {
	$id = $request->getAttribute('id');
	$band = $request->getParam('band');
	$album = $request->getParam('album');
	$album_cover = $request->getParam('album_cover');
	$release_date = $request->getParam('release_date');
	
	$id = $request->getAttribute('id');
	$sql = "UPDATE albums SET
		band = :band,
		album = :album,
		album_cover = :album_cover,
		release_date = :release_date
		WHERE id = $id";
	
	try{
		$db = new db();
		
		$db = $db->connect();
		
		$stmt = $db->prepare($sql);
		
		$stmt->bindParam(':band', $band);
		$stmt->bindParam(':album', $album);
		$stmt->bindParam(':album_cover', $album_cover);
		$stmt->bindParam(':release_date', $release_date);
		
		$stmt->execute();
		
		echo '{"notice": {"text": "Album updated"}';
	} catch(PDOException $e) {
		echo '{"error": {"text": '.$e->getMessage().'}';
	}
});


// DELETE
$app->delete('/api/releases/delete/{id}', function(Request $request, Response $response) {
	
	$id = $request->getAttribute('id');
	$sql = "DELETE FROM albums WHERE id = $id";
	
	try{
		$db = new db();
		
		$db = $db->connect();
		
		$stmt = $db->prepare($sql);
		$stmt->execute();
		$db = null;
		
		echo '{"notice": {"text": "Album deleted"}';
	} catch(PDOException $e) {
		echo '{"error": {"text": '.$e->getMessage().'}';
	}
});