package com.kh.app.member.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kh.app.member.service.MemberService;
import com.kh.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("member")
@RequiredArgsConstructor
@CrossOrigin("*")
public class MemberController {
	private final MemberService ms;
	
//	//react
//	.then(data => {
//	else	if(data) {
//			아이디가 중복입니다
//		}
//	})
	
	
	//회원가입 
	@PostMapping("join")
	public String join(@RequestBody MemberVo vo) throws Exception{
//		System.out.println("fetch 통해서 받은 데이터:"+vo);
		String msg = ms.join(vo);
		return msg;
		//return ms.join
	}
	
	//로그인
	@PostMapping("login")
	public Map<String, Object> login(@RequestBody MemberVo vo,HttpSession session)throws Exception {
		
		MemberVo loginMember =ms.login(vo);
		session.setAttribute("loginMember", loginMember);
		loginMember.setPwd("");
		
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("msg", "good");
		map.put("loginMember", loginMember);

		if(loginMember==null) {
			map.put("msg", "bad");
		}
		
		return map;
	}
	
//	아이디 중복체크 조건 => 만약에 중복이 되는아이디? => map에 msg를 담고 계속 리턴해주면 회원가입이 안돼겠지
//	=> insert 중복체크도 OK 회원가입ok
	
	//회원 정보 수정
	@PostMapping("edit")
	public Map<String, Object> edit(@RequestBody MemberVo vo) throws Exception {
		System.out.println("fetch 통해서 받은 데이터:"+vo);
		int result=ms.edit(vo);
		
		Map<String, Object> map=new HashMap<String, Object>();
		
		if(result==1) {
			map.put("msg", "good");
		}else {
			map.put("msg", "bad");
		}
		return map;
		
	}
	
//	비밀번호 재확인
	@PostMapping("pwdcheck")
	public Map<String, Object> pwdcheck(@RequestBody MemberVo vo,HttpSession session) throws Exception{
		System.out.println("fetch 통해서 받은 데이터:"+vo);
		
		MemberVo loginMember = (MemberVo)session.getAttribute("loginMember");
		System.out.println(loginMember);
		String loginPwd = loginMember.getPwd();
		
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("msg", "good");
		if(!loginPwd.equals(vo.getPwd())) {
			map.put("msg", "bad");
		}
		return map;
	}
}
