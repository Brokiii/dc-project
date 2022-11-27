package pl.gda.edu.pg.mail;

import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.Properties;

@Service
public class MailService {
    String from = "harnoldydc@gmail.com";
    String password = "";
    String host = "smtp.gmail.com";
    Properties properties = System.getProperties();

    public MailService() {
        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", "465");
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");
    }

    public void sendEmail(String to) throws MessagingException {
        Session session = Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(from, password);
            }
        });
        session.setDebug(true);
        String text = "";
        MimeMessage message = new MimeMessage(session);
        message.setFrom(new InternetAddress(from));
        message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
        message.setSubject("HARNOLDY INSURANCE");
        message.setText(text);
        Transport.send(message);
    }
}
