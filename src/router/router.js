import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../layout/content/Main";
import NotFoundError from "../components/errors/NotFoundError";
import SurveyApp from "../components/survey/SurveyApp";
import projectRouter from "./routercomponent/projectRouter";
import outputRouter from "./routercomponent/outputRouter";
import requirementRouter from "./routercomponent/requirementRouter";
import supplyRouter from "./routercomponent/supplyRouter";
import deptteamRouter from "./routercomponent/deptteamRouter";
import reviewRouter from "./routercomponent/reviewRouter";
import employeeRouter from "./routercomponent/employeeRouter";
import memoRouter from "./routercomponent/memoRouter";

export default function RouterAppProvider() {
  const routers = createBrowserRouter([
    /* 라우트 영역 */
    {
      path: "/",
      element: <Main />,
      errorElement: <NotFoundError />,
      children: [
        {
          path: "survey",
          element: <SurveyApp />,
        },
        projectRouter,
        employeeRouter,
        requirementRouter,
        outputRouter,
        supplyRouter,
        deptteamRouter,
        reviewRouter,
        memoRouter,
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}
