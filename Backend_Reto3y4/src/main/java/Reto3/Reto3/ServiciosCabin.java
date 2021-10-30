/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package Reto3.Reto3;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Brayan Tafur
 */
@Service
public class ServiciosCabin {
    @Autowired
    private RepositorioCabin metodosCrud;

    public List<Cabin> getAll(){
        return metodosCrud.getAll();
    }

    public Optional<Cabin> getCabin(int bikeId) {
        return metodosCrud.getCabin(bikeId);
    }

    public Cabin save(Cabin bike){
        if(bike.getId()==null){
            return metodosCrud.save(bike);
        }else{
            Optional<Cabin> e=metodosCrud.getCabin(bike.getId());
            if(e.isEmpty()){
                return metodosCrud.save(bike);
            }else{
                return bike;
            }
        }
    }

    public Cabin update(Cabin cabin){
        if(cabin.getId()!=null){
            Optional<Cabin> e=metodosCrud.getCabin(cabin.getId());
            if(!e.isEmpty()){
                if(cabin.getBrand()!=null){
                    e.get().setBrand(cabin.getBrand());
                }
                if(cabin.getRooms()!=null){
                    e.get().setRooms(cabin.getRooms());
                }
                if(cabin.getCategory()!=null){
                    e.get().setCategory(cabin.getCategory());
                }
                if(cabin.getName()!=null){
                    e.get().setName(cabin.getName());
                }
                if(cabin.getDescription()!=null){
                    e.get().setDescription(cabin.getDescription());
                }
                metodosCrud.save(e.get());
                return e.get();
            }else{
                return cabin;
            }
        }else{
            return cabin;
        }
    }


    public boolean deleteCabin(int cabinId) {
        Boolean aBoolean = getCabin(cabinId).map(cabin -> {
            metodosCrud.delete(cabin);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}
