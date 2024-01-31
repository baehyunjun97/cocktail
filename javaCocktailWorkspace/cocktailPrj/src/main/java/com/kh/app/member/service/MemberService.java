package com.kh.app.member.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Service;

import com.kh.app.cocktail.service.CocktailService2;
import com.kh.app.cocktail.vo.CocktailVo2;
import com.kh.app.cocktail.vo3.CocktailVo3;
import com.kh.app.member.dao.MemberDao;
import com.kh.app.member.vo.MemberVo;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MemberService {

	private final MemberDao dao;
	private final SqlSessionTemplate sst;
	private final CocktailService2 service2;

	// 회원가입
	public String join(MemberVo vo) throws Exception {
		String id = vo.getId();
		if (id.length() < 4) {
			throw new Exception("아이디가 짧습니다.");
		}
		String pwd = vo.getPwd();
		if (pwd.length() < 4) {
			throw new Exception("비밀번호가 짧습니다.");
		}
		if ("admin".equalsIgnoreCase(id)) {
			throw new Exception("사용불가한 아이디");
		}

//		Map<String, Object> map=new HashMap<String, Object>();
		String msg = null;

		// 0아니면 1을 리턴
		//아이디 중복확인
		int idCheck = dao.idCheck(sst, vo);
		
//		 아이디가 없어야 성공이니 
		if (idCheck == 1) {
//			map.put("msg", "아이디 중복");
			msg = "overlapId";
			return msg;
		}

		// 아이디 작성 조건
		if (!id.matches("^[a-zA-Z0-9]+$")) {
			msg = "bad";
			return msg;
		}

		String pwd2 = vo.getPwd2();
		// 비밀번호 작성 조건
		if (!pwd.matches("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{4,}$")) {
			System.out.println("tq");
			msg = "bad";
			return msg;
		}
		// 비밀번호 일치여부
		if (!pwd.equals(pwd2)) {
			msg = "bad";
			return msg;
		}

		String email = vo.getEmail();
		// 이메일 작성 조건
		if (!email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")) {
			msg = "bad";
			return msg;
		}
		//이메일 중복확인
		int emailCheck = dao.emailCheck(sst, vo);
//		System.out.println(emailCheck);
		
//		이메일이 없어야 성공이니 
		if (emailCheck == 1) {
			msg = "overlapEmail";
			return msg;
		}

		int result = dao.join(sst, vo);

		if (result == 1) {
//			map.put("msg", "good");
			msg = "good";
		} else {
//			map.put("msg", "bad");
			msg = "bad";
		}

		return msg; // 이 메소드를 호출한게 있지? 그호출한 메소드에서 필요한 데이터를 쓰면 됨
	}

	// 로그인
	public MemberVo login(MemberVo vo) {
		if (vo.getReload() != null) {
			if (vo.getReload().equals("Y")) {
				return dao.reload(sst, vo);
			}
		}

		MemberVo memberVo = dao.login(sst, vo);
		return memberVo;
	}

	// 정보수정
	public int edit(MemberVo vo) {
//		System.out.println(vo);
		return dao.edit(sst, vo);
	}

	// 업로드
//	public List<CocktailVo3> upload(CocktailVo3 cvo) {
//		
//		List<CocktailVo3> cocktailVoList = dao.upload(sst,cvo);
//		
//		Map<String, CocktailVo3> map = new HashMap<String, CocktailVo3>();
//
//		for (CocktailVo3 cocktailVo : cocktailVoList) {
//			map.put(cocktailVo.getCocktailNo(), cocktailVo);
//		}
//		
//		for(int i=0; i<cocktailVoList.size(); i++) {
//			map.put(cocktailVoList.get(i).getCocktailNo(), cocktailVoList.get(i));
//		}
//		
//		ArrayList<CocktailVo3> result = new ArrayList<CocktailVo3>(map.values());
//
//		return result;
//	}
	
	// 즐겨찾기
//	List<CocktailVo3> cocktailVoList = dao.bookmark(sst,cvo);
//	
//	Map<String, CocktailVo3> map = new HashMap<String, CocktailVo3>();
//
//	for (CocktailVo3 cocktailVo : cocktailVoList) {
//		map.put(cocktailVo.getCocktailNo(), cocktailVo);
//	}
//	
//	ArrayList<CocktailVo3> result = new ArrayList<CocktailVo3>(map.values());

	// 마이페이지 통합
	public Map<String, List<CocktailVo2>> myCocktails(CocktailVo2 cvo) {

		// dao호출
		List<CocktailVo2> cocktailVoList = dao.bookmark(sst, cvo);
		List<CocktailVo2> cocktailVoList2 = dao.upload(sst, cvo);

		// 중복되는 리스트를 합쳐 베이스 이름을 할당해 리스트로 반환하는 메소드
		List<CocktailVo2> bookmarkVoList = service2.mergeDuplicateCocktails(cocktailVoList);
		List<CocktailVo2> uploadVoList = service2.mergeDuplicateCocktails(cocktailVoList2);

		// 알코 도수에 따라 도수세기로 변경해주는 메소드
		service2.assignAlcoholStrength(bookmarkVoList);
		service2.assignAlcoholStrength(uploadVoList);

		Map<String, List<CocktailVo2>> map = new HashMap<>();
		map.put("bookmark", bookmarkVoList);
		map.put("upload", uploadVoList);



		return map;

	}

	// 비밀번호 재확인
	public int pwdcheck(MemberVo vo) {
		
		return dao.pwdcheck(sst, vo);
	}

	// 이메일 인증
	public MemberVo emailCertification(MemberVo vo) {
		return dao.emailCertification(sst, vo);
	}

	// 아이디 찾기
	public String getIdByEmail(MemberVo vo) {
		return dao.getIdByEmail(sst, vo);
	}

	// 비번 찾기
	public String getPwdByEmail(MemberVo vo) {
		return dao.getPwdByEmail(sst, vo);
	}

}
