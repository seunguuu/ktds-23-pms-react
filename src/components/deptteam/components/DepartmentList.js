import { useCallback, useEffect, useMemo, useState } from "react";
import { loadDepartmentList } from "../../../http/deptteamHttp.js";
import TeamList from "./TeamList.js";
import Table from "../../../utils/Table.js";
import s from "./departmentList.module.css";

export default function DepartmentList({ token }) {
  const [selectedDeptId, setSelectedDeptId] = useState();
  const [data, setData] = useState();

  // departmentList;
  const memoizedLoaddepartmentList = useCallback(loadDepartmentList, []);
  const memoizedToken = useMemo(() => {
    return { token };
  }, [token]);

  useEffect(() => {
    const fetchingData = async () => {
      const json = await memoizedLoaddepartmentList({ ...memoizedToken });
      setData(json.body);
    };

    fetchingData();
  }, [memoizedLoaddepartmentList, memoizedToken]);

  // ===============
  console.log(data);
  const onDepartmentClick = (rowId) => {
    setSelectedDeptId((prevId) => (prevId === rowId ? undefined : rowId));
  };

  // 컬럼에 데이터 넣기
  const columns = [
    {
      title: "부서명",
      dataIndex: "deptName",
      key: "deptName",
      // width: "50%",
    },
    {
      title: "부서장명",
      dataIndex: "empName",
      key: "empName",
      // width: "50%",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      key: "email",
      // width: "50%",
    },
  ];

  // 검색 필터
  const filterOptions = [
    { label: "부서명", value: "deptName" },
    { label: "부서ID", value: "deptId" },
    { label: "부서장명", value: "empName" },
  ];
  return (
    <>
      {data && <div>총 {data.length}개의 부서가 검색되었습니다.</div>}
      <div className={s.contentLayout}>
        {data && (
          <>
            <div className={s.layout}>
              <Table
                columns={columns}
                dataSource={data}
                rowKey={(dt) => dt.deptId}
                filter
                filterOptions={filterOptions}
                onRow={(record) => {
                  return {
                    onClick: () => {
                      onDepartmentClick(record.deptId);
                    },
                    style: { cursor: "pointer" },
                  };
                }}
              />
            </div>
          </>
        )}
        {/* <div>
        <h4>부서</h4>
        <div>
          <table>
            <thead>
              <tr>
                <th>부서ID</th>
                <th>부서명</th>
              </tr>
            </thead>
            <tbody>
              {departmentList &&
                departmentList.map((department) => (
                  <tr
                    key={department.deptId}
                    onClick={() => onDepartmentClick(department.deptId)}
                  >
                    <td>{department.deptId}</td>
                    <td>{department.deptName}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div> */}
        {selectedDeptId && (
          <div className={s.layout}>
            <TeamList
              selectedDeptId={selectedDeptId}
              setSelectedDeptId={setSelectedDeptId}
              token={token}
            />
          </div>
        )}
      </div>
    </>
  );
}
