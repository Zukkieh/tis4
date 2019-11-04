import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Login from './pages/Login';
import MainFono from './pages/MainFono';
import MainPaciente from './pages/MainPaciente';
import Register from './pages/Register';
import RegisterPaciente from './pages/RegisterPaciente';
import listaPaciente from './pages/listaPaciente';
import Options from './pages/Options';
import ChangePassword from './pages/ChangePassword';
import Games from './pages/Games';
import Fonemas from './pages/Fonemas';
import ManagePac from './pages/gerenciaPaciente';
import Bombardeio from './pages/bombardeioAuditivo';
import bombAudit_1 from './pages/bombAudit_1';
import bombAudit_2 from './pages/bombAudit_2';
import bombAudit_3 from './pages/bombAudit_3';
import bombAudit_4 from './pages/bombAudit_4';
import SeeProgress from './pages/SeeProgress';
import EditPermissao from './pages/editPermissao';
import PacienteCertificado from './pages/PacienteCertificado';
import ParesMinimos from './pages/ParesMinimos';
import Certificado from './pages/certificado';
import listaCertificadoPaciente from './pages/listaPacienteCertificado'

export default createAppContainer(
    createSwitchNavigator({
        Login,
        Register,
        MainPaciente,
        RegisterPaciente,
        listaPaciente,
        MainFono,
        Options,
        ChangePassword,
        Games,
        Fonemas,
        ManagePac,
        Bombardeio,
        bombAudit_1,
        bombAudit_2,
        bombAudit_3,
        bombAudit_4,
        EditPermissao,
        SeeProgress,
        PacienteCertificado,
        ParesMinimos,
        Certificado,
        listaCertificadoPaciente
    })
);