<?php
namespace Slim_app\Model;

use Slim_app\Lib\Database;
use Slim_app\Lib\Response;

class UserModel
{
    private $db;
    private $table = 'oficios';
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
                        (tipo, nombre, descripcion, activo)
                        VALUES (?,?,?,?)";
                    
            $this->db->prepare($sql)
                     ->execute(
                        array(
                            $data['tipo'], 
                            $data['nombre'],
                            $data['descripcion'],
                            $data['activo']
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
                            Nombre          = ?, 
                            Apellido        = ?,
                            Correo          = ?,
                            Sexo            = ?,
                            Sueldo          = ?,
                            Profesion_id    = ?,
                            FechaNacimiento = ?
                        WHERE id = ?";
                
                $this->db->prepare($sql)
                     ->execute(
                        array(
                            $data['Nombre'], 
                            $data['Apellido'],
                            $data['Correo'],
                            $data['Sexo'],
                            $data['Sueldo'],
                            $data['Profesion_id'],
                            $data['FechaNacimiento'],
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