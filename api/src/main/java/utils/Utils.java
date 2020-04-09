package utils;

import org.json.JSONException;
import org.json.JSONObject;

import javax.json.Json;
import javax.json.JsonObjectBuilder;
import javax.json.JsonReader;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

public class Utils {

    public static int getSingletonInt(Statement statement, String sql) throws SQLException {
        ResultSet rs = statement.executeQuery(sql);
        rs.next();
        return rs.getInt("result");
    }

    public static JSONObject mergeJSON(JSONObject obj1, JSONObject obj2){
        JSONObject merged = new JSONObject();
        try{
            merged = new JSONObject(obj1, JSONObject.getNames(obj1));
            for(String crunchKey : JSONObject.getNames(obj2)){
                merged.put(crunchKey, obj2.get(crunchKey));
            }
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return merged;
    }

    public static JsonObjectBuilder errorJSONObjectBuilder(String errorMessage) {
        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        responseObject.add("status", "error");
        responseObject.add("dialog_id", errorMessage);
        return responseObject;
    }

    public static JsonObjectBuilder successJSONObjectBuilder(String successMessage, JsonReader reader) {
        JsonObjectBuilder responseObject = Json.createObjectBuilder();
        responseObject.add("status", "ok");
        responseObject.add("dialog_id", successMessage);
        if(reader != null) {
            responseObject.add("data", reader.readValue());
        }
        return responseObject;
    }

}
