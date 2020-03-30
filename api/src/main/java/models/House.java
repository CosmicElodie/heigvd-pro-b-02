package models;

import org.json.JSONObject;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;

@Entity
@Table(name = "house")
public class House {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "house_id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "shortname")
    private String shortname;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public JSONObject getJSON(){
        JSONObject json = new JSONObject();
        json.put("house_id", this.id);
        json.put("name", this.name);
        json.put("shortname", this.shortname);
        return json;
    }

}
