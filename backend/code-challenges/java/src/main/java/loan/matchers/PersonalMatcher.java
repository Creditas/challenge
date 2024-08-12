package loan.matchers;

public class PersonalMatcher implements Matcher {
    public static String TYPE = "PERSONAL_LOAN";

    @Override
    public String type() {
        return TYPE;
    }
}
