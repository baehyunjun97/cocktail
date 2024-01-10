package com.kh.app.member.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.stereotype.Repository;

import com.kh.app.cocktail.vo3.CocktailVo3;
import com.kh.app.member.vo.MemberVo;

@Repository
public class MemberDao {
	
	//회원가입
	public int join(SqlSessionTemplate sst, MemberVo vo) {
		return sst.insert("MemberMapper.join",vo);
	}
	
	//로그인
	public MemberVo login(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MemberMapper.login",vo);
	}

	//회원정보수정
	public int edit(SqlSessionTemplate sst, MemberVo vo) {
		return sst.update("MemberMapper.edit",vo);
	}
	
	//업로드
	public List<CocktailVo3> upload(SqlSessionTemplate sst, CocktailVo3 cvo) {
		return sst.selectList("MypageMapper.upload",cvo);
	}
	
	//즐겨찾기
	public List<CocktailVo3> bookmark(SqlSessionTemplate sst, CocktailVo3 cvo) {
		return sst.selectList("MypageMapper.bookmark",cvo);
	}

	public int idCheck(SqlSessionTemplate sst, MemberVo vo) {
		return sst.selectOne("MypageMapper.idCheck",vo);
	}
//	아이디 단 한개야 
//	SELECT COUNT(*) 카운터를 이용해서 조회 0 아니면 1이 나옴
//	FROM MEMBER
//	WHERE ID = #{id} d아이디 중복 =1 아니면 0
	
	
	

	
	
	
	

}
