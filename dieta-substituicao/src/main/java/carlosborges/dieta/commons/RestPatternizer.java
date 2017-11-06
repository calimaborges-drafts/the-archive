package carlosborges.dieta.commons;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAccessor;
import java.util.Date;

public class RestPatternizer {

    public String utcIso8601(Date date) {
        return DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mmX")
            .withZone(ZoneOffset.UTC)
            .format(date.toInstant());
    }

    public Date utcIso8601(String date) {
        TemporalAccessor accessor = DateTimeFormatter.ISO_DATE_TIME.parse(date);
        return Date.from(Instant.from(accessor));
    }
}
