export default function LoginPage() {
  const onClickHandler = () => {};

  return (
    <>
      <div className="container">
        <div className="item header"></div>
        <div className="item"></div>
        <div className="item">
          <input type="hidden" name="next" id="next" value="${nextUrl}" />
          <form id="loginForm">
            <div className="leftForm"></div>
            <div className="formBackground">
              <div className="inputText">
                <div className="id">
                  <img className="loginLogo" src="/images/login.png" />
                  <input id="empId" type="text" name="empId" required />
                  <label for="empId">ID</label>
                  <span></span>
                </div>
                <div className="pwd">
                  <img
                    className="passwordLogo"
                    src="/images/header-login.png"
                  />
                  <input id="pwd" type="password" name="pwd" required />
                  <label for="pwd">PASSWORD</label>
                  <span></span>
                </div>
                <div className="login-btn">
                  <button type="button" id="login-btn">
                    LOGIN
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="item"></div>
      </div>
      <div className="footer">
        <div>
          PMS 는 회사 임직원 관리, 비품 관리 및 예정 프로젝트를 관리하는
          프로그램입니다.
        </div>
        <div>
          로그인 후 이용하실 수 있으며 임/직원 신규 등록은
          경영지원부(tel:123-1234)로 문의 부탁드립니다.
        </div>
        <div>회사 정보(KtdsUniversity 이메일 : kwon@kt.ds)</div>
        <div>회사 주소 : 효령로 176</div>
        <div></div>
        <br />
        <br />
        <div>@COPYRIGHT KTDS UNIVERSITY 2008 ALL RIGHTS RESERVED.</div>
      </div>
    </>
  );
}
