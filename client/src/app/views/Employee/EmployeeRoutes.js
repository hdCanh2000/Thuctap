import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Agency = EgretLoadable({
    loader: () => import("./Employee")
});
const ViewComponent = withTranslation()(Agency);
const EmployeeRoutesRoutes = [
    {
        path: ConstantList.ROOT_PATH + "directory/employees",
        exact: true,
        component: ViewComponent
    }
];

export default EmployeeRoutesRoutes;