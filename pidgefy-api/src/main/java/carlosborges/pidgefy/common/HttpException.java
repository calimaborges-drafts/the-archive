package carlosborges.pidgefy.common;

public class HttpException extends Exception {
    public Integer status;
    public String message;

    public HttpException(Integer status, String message) {
        this.status = status;
        this.message = message;
    }
}
