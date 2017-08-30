<?php
namespace Slim_app\Model;

use Slim_app\Lib\Database;
use Slim_app\Lib\Response;

class UserModel
{
    private $db;
    private $table = 'users';
    private $response;
    
    public function __CONSTRUCT()
    {
        $this->db = Database::StartUp();
        $this->response = new Response();
    }
    
    public function GetAll()
    {
		try
		{
			$result = array();

			$stm = $this->db->prepare("SELECT * FROM $this->table");
			$stm->execute();
            
			$this->response->setResponse(true);
            $this->response->result = $stm->fetchAll();
            
            return $this->response->result;
		}
		catch(Exception $e)
		{
			$this->response->setResponse(false, $e->getMessage());
            return $this->response;
		}
    }
    
    public function Get($id)
    {
		try
		{
			$result = array();

			$stm = $this->db->prepare("SELECT * FROM $this->table WHERE id = ?");
			$stm->execute(array($id));

			$this->response->setResponse(true);
            $this->response->result = $stm->fetch();
            return $this->response->result;
		}
		catch(Exception $e)
		{
			$this->response->setResponse(false, $e->getMessage());
            return $this->response;
		}  
    }
    
    public function Insert($data)
    {
        try {
            $sql = "INSERT INTO $this->table
                        (id, nombre)
                        VALUES (?,?)";
                    
            $this->db->prepare($sql)
                     ->execute(
                        array(
                            $data['id'], 
                            $data['nombre']
                        )
                    ); 
                
                
            $this->response->setResponse(true);
            return $this->response;
            
        } catch (Exception $e) {
            $this->response->setResponse(false, $e->getMessage());
        }
    }

    public function Update($data)
    {
		try 
		{
                $sql = "UPDATE $this->table SET 
                            id          = ?, 
                            nombre        = ?
                        WHERE id = ?";
                
                $this->db->prepare($sql)
                     ->execute(
                        array(
                            $data['id'],
                            $data['nombre'],
                            $data['id']
                        )
                    );
            $this->response->setResponse(true);
            return $this->response;
        
		}catch (Exception $e) 
		{
            $this->response->setResponse(false, $e->getMessage());
		}
    }
    
    public function Delete($id)
    {
		try 
		{
			$stm = $this->db->prepare("DELETE FROM $this->table WHERE id = ?");			          

			$stm->execute(array($id));
            
			$this->response->setResponse(true);
            return $this->response;
		} catch (Exception $e) 
		{
			$this->response->setResponse(false, $e->getMessage());
		}
    }
}