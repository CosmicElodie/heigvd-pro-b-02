package models;

import org.json.JSONObject;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
@Table(name = "house")
public class House implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "house_id")
    private int id;

    @Column(name = "name")
    private String name;

    @Column(name = "shortname")
    private String shortname;

    @Column(name = "avatar")
    private String avatar;

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
        json.put("avatar", this.avatar);
        return json;
    }

}
