package cz.klecansky.recipedb;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import jakarta.servlet.http.Cookie;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;

public class TestUtils {
    public static List<Cookie> login(MockMvc mockMvc) throws Exception {
        ResultActions perform = mockMvc.perform(multipart("/login")
                .param("username", "admin")
                .param("password", "admin"));
        List<Cookie> cookies = new ArrayList<>();
        perform.andDo(result -> cookies.addAll(List.of(result.getResponse().getCookies())));
        return cookies;
    }
}
