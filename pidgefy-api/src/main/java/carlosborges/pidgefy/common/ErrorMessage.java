package carlosborges.pidgefy.common;

import java.io.Serializable;

public class ErrorMessage implements Serializable {

    public Integer code;
    public String message;

    public ErrorMessage(Integer code, String message) {
        this.code = code;
        this.message = message;
    }

}
