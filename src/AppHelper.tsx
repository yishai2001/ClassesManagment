import ClassPage from "./Pages/ClassPage/ClassPage";
import StudentPage from "./Pages/StudentsPage/StudentPage";
import CreatePage from "./Pages/CreatePage/CreatePage";
import StudentsOfClass from "./Pages/StudentsOfClass/StudentsOfClass";

export const routes = [
    {path:"/", element: <ClassPage />, name:"Class Student"},
    {path:"/StudentPage", element: <StudentPage />, name:"Student Page"},
    {path:"/CreatePage", element: <CreatePage />, name:"Create Page" },
    {path:"/StudentOfClass/:classId", element: <StudentsOfClass />}
]
