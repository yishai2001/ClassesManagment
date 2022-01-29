import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Class, Student } from "../../interfaces/Interface";
import { useContext, useState } from "react";
import { useGetAllClasses } from "../../api/apiClasses";
import { updateStudent } from "../../api/apiSudents";
import Button from "@mui/material/Button";
import ThemeContext from "./../ThemeContext/ThemeContext";

const ClassMenu = (props: {
  stu: Student;
  students: Student[];
  setClassList: React.Dispatch<React.SetStateAction<Class[]>>;
  classList: Class[];
}) => {
  //blueMode
  const blueMode = useContext(ThemeContext);
  const themeStyles = {
    color: blueMode,
    borderColor: blueMode,
  };

  const { stu, students, classList, setClassList } = props;
  useGetAllClasses(setClassList);

  //menu hadler
  const [classMenu, setClassMenu] = useState<null | HTMLElement>(null);
  const open = Boolean(classMenu);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setClassMenu(event.currentTarget);
  };
  const handleClose = () => {
    setClassMenu(null);
  };

  const menuHandler = (student: Student) => {
    return classList.map((cla) => classDefine(student, cla));
  };

  const handleUpdate = (student: Student, cla: Class) => {
    if (student.classId !== null) {
      classList.map((oldClass) => {
        if (oldClass.classId === student.classId) {
          oldClass.currentCapacity = +oldClass.currentCapacity - 1;
        }
      });
    }
    updateStudent(student.id, +cla.classId);
    students.map((updated) => {
      if (updated.id === student.id) {
        updated.classId = +cla.classId;
      }
    });
    classList.map((newClass) => {
      if (newClass.classId === student.classId) {
        newClass.currentCapacity = +newClass.currentCapacity + 1;
      }
    });
    menu = menuHandler(stu);
    setClassMenu(null);
  };

  const classDefine = (student: Student, cla: Class) => {
    if (student.classId !== cla.classId && cla.currentCapacity < cla.maxSeats) {
      return (
        <MenuItem key={cla.classId} onClick={() => handleUpdate(student, cla)}>
          {cla.name}
        </MenuItem>
      );
    }
    if (student.classId !== cla.classId && cla.currentCapacity >= cla.maxSeats) {
      return (
        <MenuItem key={cla.classId} disabled>
          {cla.name}
        </MenuItem>
      );
    } else {
      return (
        <MenuItem
          key={cla.classId}
          disabled
          style={{ backgroundColor: "yellowgreen" }}
        >
          {cla.name}
        </MenuItem>
      );
    }
  };
  let menu = menuHandler(stu);

  return (
    <div>
      <Button onClick={handleClick} style={themeStyles} variant="outlined">
        ASSIGN TO CLASS
      </Button>
      <Menu
        id="basic-menu"
        key={stu.id}
        anchorEl={classMenu}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {menu}
      </Menu>
    </div>
  );
};

export default ClassMenu;
