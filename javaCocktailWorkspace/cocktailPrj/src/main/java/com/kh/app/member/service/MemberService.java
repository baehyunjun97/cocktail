package com.kh.app.member.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.cocktail.vo3.CocktailVo3;
import com.kh.app.member.dao.MemberDao;
import com.kh.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {
	
	private final MemberDao dao;
	private final SqlSessionTemplate sst;
	
	//회원가입
	public String join(MemberVo vo) throws Exception {
		String id= vo.getId();
		if(id.length()<4) {
			throw new Exception("아이디가 짧습니다.");
		}
		if("admin".equalsIgnoreCase(id)) {
			throw new Exception("사용불가한 아이디");
		}
		
//		Map<String, Object> map=new HashMap<String, Object>();
		String msg = null;
		
		// 0아니면 1을 리턴 
		int idCheck = dao.idCheck(sst,vo); 
		
//		 아이디가 없어야 성공이니 
		if(idCheck == 1) {
//			map.put("msg", "아이디 중복");
			msg="overlap";
			return msg;
		}	
		int result = dao.join(sst,vo);
		
		if(result==1) {
//			map.put("msg", "good");
			msg = "good";
		}else {
//			map.put("msg", "bad");
			msg = "bad";
		}
		
		//아이디 작성 조건
		if(!id.matches("^[a-zA-Z0-9]+$")) {
			msg = "bad";
		}
		
		String pwd= vo.getPwd();
		String pwd2= vo.getPwd2();
		//비밀번호 작성 조건
		if(!pwd.matches("[a-zA-Z0-9!@#$%^&*]+$")) {
			msg = "bad";
		}
		//비밀번호 일치여부
		if(!pwd.equals(pwd2)) {
			msg = "bad";
		}
		
		String email= vo.getEmail();
		//이메일 작성 조건
		if(!email.matches("^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z]{2,7}$")) {
			msg = "bad";
		}
		
		return msg; // 이 메소드를 호출한게 있지? 그호출한 메소드에서 필요한 데이터를 쓰면 됨
	}
	
	//로그인
	public MemberVo login(MemberVo vo) {
		return dao.login(sst,vo);
	}
	
	//정보수정
	public int edit(MemberVo vo) {
		return dao.edit(sst,vo); 
	}
	
	//업로드
	public List<CocktailVo3> upload(CocktailVo3 cvo) {
		
		List<CocktailVo3> cocktailVoList = dao.upload(sst,cvo);
		
		Map<String, CocktailVo3> map = new HashMap<String, CocktailVo3>();

		for (CocktailVo3 cocktailVo : cocktailVoList) {
			map.put(cocktailVo.getCocktailNo(), cocktailVo);
		}
		
//		for(int i=0; i<cocktailVoList.size(); i++) {
//			map.put(cocktailVoList.get(i).getCocktailNo(), cocktailVoList.get(i));
//		}
		
		ArrayList<CocktailVo3> result = new ArrayList<CocktailVo3>(map.values());

		return result;
	}
	
	//즐겨찾기
	public List<CocktailVo3> bookmark(CocktailVo3 cvo) {
		List<CocktailVo3> cocktailVoList = dao.bookmark(sst,cvo);
		
		Map<String, CocktailVo3> map = new HashMap<String, CocktailVo3>();

		for (CocktailVo3 cocktailVo : cocktailVoList) {
			map.put(cocktailVo.getCocktailNo(), cocktailVo);
		}
		
		ArrayList<CocktailVo3> result = new ArrayList<CocktailVo3>(map.values());

		return result;
		
	}
	
	//비밀번호 재확인
	public int pwdcheck(MemberVo vo) {
		return dao.pwdcheck(sst,vo);
	}

	
	
}
