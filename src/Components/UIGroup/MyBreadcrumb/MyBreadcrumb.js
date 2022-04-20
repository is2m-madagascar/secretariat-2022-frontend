import Breadcrumbs from "@mui/material/Breadcrumbs";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { emphasize, styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import { useLocation } from "react-router-dom";

const formatName = (name) => {
  return name.slice(1, 2).toUpperCase() + name.substring(2);
};

const handleClick = (event) => {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
};

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];
  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

const MyBreadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
      >
        <StyledBreadcrumb
          component="a"
          href="/"
          label="Home"
          icon={<HomeIcon fontSize="small" />}
        />
        {pathnames.map((value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <StyledBreadcrumb key={to} label={formatName(to)} />
          ) : (
            <StyledBreadcrumb
              key={to}
              component="a"
              href={to}
              label={formatName(to)}
            />
          );
        })}
      </Breadcrumbs>
    </div>
  );
};

export default MyBreadcrumb;
