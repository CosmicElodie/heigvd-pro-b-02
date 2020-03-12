package controllers;

import models.User;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import repositories.UserRepository;
import utils.Utils;

import java.security.Principal;

@RestController
public class AuthenticationController {

    @Autowired // will inject the instance of UserRepository when AuthenticationController instance created
    private UserRepository userRepository;

    @GetMapping("/authentication/user_data")
    public String userData(Principal userPrincipal){
            JSONObject responseObject = new JSONObject();
            JSONObject authenticated = new JSONObject();
            responseObject.put("status", "ok");
            authenticated.put("is_authenticated", userPrincipal != null);
            if(userPrincipal != null){
                Authentication auth = SecurityContextHolder.getContext().getAuthentication();
                responseObject.put("id", "authenticated");
                responseObject.put("data", Utils.mergeJSON(((User) auth.getPrincipal()).getJSON(), authenticated));
                responseObject.put("authorities", auth.getAuthorities());
            }else{
                responseObject.put("id", "not_authenticated");
                responseObject.put("data", authenticated);
            }
            return responseObject.toString();
    }

    @PostMapping("/authentication/user_login")
    public String userLogin(@RequestParam("email") String email, @RequestParam("password") String password){
        JSONObject responseObject = new JSONObject();
        User user = this.userRepository.findByEmailAddress(email);
        JSONObject authenticated = new JSONObject();
        if(user == null || !user.getPassword().equals(password)){
            authenticated.put("is_authenticated", false);
            responseObject.put("dialog_id", "login_failed");
            responseObject.put("data", authenticated);
            return responseObject.toString();
        }

        if(user.getPassword().equals(password)){
            UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
            SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_GLOBAL);
            SecurityContextHolder.getContext().setAuthentication(auth);
            authenticated.put("is_authenticated", true);
            responseObject.put("dialog_id", "login_success");
            responseObject.put("data", Utils.mergeJSON(user.getJSON(), authenticated));
        }
        return responseObject.toString();
    }

    @GetMapping("/authentication/user_logout")
    public String userLogout(){
        JSONObject responseObject = new JSONObject();
        JSONObject authenticated = new JSONObject();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        SecurityContextHolder.setStrategyName(SecurityContextHolder.MODE_GLOBAL);
        auth.setAuthenticated(false);
        SecurityContextHolder.clearContext();
        authenticated.put("is_authenticated", false);
        responseObject.put("dialog_id", "logout_success");
        responseObject.put("data", authenticated);
      return responseObject.toString();
    }

    @GetMapping("/authentication/user")
    public String currentUserName(Principal principal) {
        return principal.getName();
    }

}
