package utils;

import org.json.JSONException;
import org.json.JSONObject;

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


}
