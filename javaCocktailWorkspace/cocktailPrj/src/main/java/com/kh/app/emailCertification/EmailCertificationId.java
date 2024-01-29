package com.kh.app.emailCertification;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.mail.internet.MimeMessage;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.member.dao.MemberDao;
import com.kh.app.member.service.MemberService;
import com.kh.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

// 스프링 빈을 등록 
@RestController
@RequestMapping("email")
@RequiredArgsConstructor
@CrossOrigin
public class EmailCertificationId {
	
	// di ( 의존성주입 )
	private final MemberDao dao;
	private final SqlSessionTemplate sst;
	private final JavaMailSender mailSender;
	private final MemberService ms;
	

	@PostMapping("idfind")
	public Map findAuth(@RequestBody MemberVo vo) {
	    System.out.println(vo);
	    Map map = new HashMap();
	    
	    //사용자가 작성한 아이디를 기준으로 존재하는 사용자인지 확인한다.(id는 회원가입시 중복 체크를 했기 때문에 유니크하다.)
	    MemberVo member = ms.emailCheck(vo); 
	    
	    if(member != null) {//회원가입이 되어있는, 존재하는 사용자라면
	        Random r = new Random();
	        int num = r.nextInt(999999); //랜덤 난수 
	        
	        StringBuilder sb = new StringBuilder();
	        
	        // DB에 저장된 email            입력받은 email
	        if(member.getEmail().equals(vo.getEmail())) {//이메일 정보 또한 동일하다면 
	    
	            String setFrom = "jay6266@naver.com";//발신자 이메일
	            String tomail = member.getEmail();//수신자 이메일
	            
	            String id = ms.getIdByEmail(vo); 
	            String title = " 아이디 찾기 인증 이메일입니다."; 
	            sb.append(String.format("안녕하세요 %s님\n", member.getNick()));
	            sb.append(String.format(" 귀하의 아이디는 %s입니다.", id)); 
//	            sb.append(String.format(" 귀하의 아이디는 %s입니다.", loginMember.getId()));
	            
//	            String pwd=ms.getPwdByEmail(vo);
//	            String title = " 비밀번호 찾기 인증 이메일입니다."; 
//	            sb.append(String.format("안녕하세요 %s님\n", loginMember.getNick()));
//	            sb.append(String.format(" 귀하의 비밀번호는 %d입니다.", num));
	            
	            String content = sb.toString();
	            
	 
	            try {
	                MimeMessage msg = mailSender.createMimeMessage();
	                MimeMessageHelper msgHelper = new MimeMessageHelper(msg, true, "utf-8");
	                
	                msgHelper.setFrom(setFrom);
	                msgHelper.setTo(tomail);
	                msgHelper.setSubject(title);
	                msgHelper.setText(content);
	                
	                //메일 전송
	                mailSender.send(msg);
	                
	            }catch (Exception e) {
	                // TODO: handle exception
	                System.out.println(e.getMessage());
	            }
	            
	            //성공적으로 메일을 보낸 경우
	            System.out.println("ㄱㅇㄷ성공");
	            map.put("msg", "good");
	            map.put("num", num);
//	            map.put("m_idx", isUser.getM_idx());
	            
	        }else {
	        	map.put("msg", "bad");
	        }
	    }
		return map;
	    
	
	}

	
}
