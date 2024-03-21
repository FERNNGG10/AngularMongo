import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { authGuard } from './core/guards/auth.guard';
import { AdminGuard } from './core/guards/admin.guard';
import { AdminGuestGuard } from './core/guards/admin-guest.guard';
import { AdminUserGuard } from './core/guards/admin-user.guard';
import { activeGuard } from './core/guards/active.guard';



export const routes: Routes = [
    {path:'home', loadComponent:()=>import('./home/home.component').then(c=>c.HomeComponent),canActivate:[authGuard,activeGuard],children:[
        {path: 'usuarios', loadComponent:()=>import('./tablas/usuarios/usuarios.component').then(c=>c.UsuariosComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
        {path: 'usuarioedit/:id', loadComponent:()=>import('./tablas/usuarios/usuarioedit/usuarioedit.component').then(c=>c.UsuarioeditComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
        {path:'categorias', loadComponent:()=>import('./tablas/categorias/categorias.component').then(c=>c.CategoriasComponent),canActivate:[authGuard,activeGuard]},
        {path:'categoriaedit/:id', loadComponent:()=>import('./tablas/categorias/categoriaedit/categoriaedit.component').then(c=>c.CategoriaeditComponent),canActivate:[authGuard,AdminUserGuard,activeGuard]},
        {path:'games', loadComponent:()=>import('./tablas/games/games.component').then(c=>c.GamesComponent),canActivate:[authGuard,AdminGuestGuard,activeGuard,activeGuard]},
        {path:'gameedit/:id', loadComponent:()=>import('./tablas/games/gameedit/gameedit.component').then(c=>c.GameeditComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
        {path:'consoles', loadComponent:()=>import('./tablas/consoles/consoles.component').then(c=>c.ConsolesComponent),canActivate:[authGuard,AdminGuestGuard,activeGuard]},
        {path:'consoleedit/:id', loadComponent:()=>import('./tablas/consoles/consoleedit/consoleedit.component').then(c=>c.ConsoleeditComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
        {path:'gadgets', loadComponent:()=>import('./tablas/gadgets/gadgets.component').then(c=>c.GadgetsComponent),canActivate:[authGuard,AdminGuestGuard,activeGuard]},
        {path:'gadgetedit/:id', loadComponent:()=>import('./tablas/gadgets/gadgetedit/gadgetedit.component').then(c=>c.GadgeteditComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
        {path:'comentarios', loadComponent:()=>import('./tablas/comentarios/comentarios.component').then(c=>c.ComentariosComponent),canActivate:[authGuard,AdminGuestGuard,activeGuard]},
        {path:'comentarioedit/:id', loadComponent:()=>import('./tablas/comentarios/comentarioedit/comentarioedit.component').then(c=>c.ComentarioeditComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
        {path:'desarrolladores', loadComponent:()=>import('./tablas/desarrolladores/desarrolladores.component').then(c=>c.DesarrolladoresComponent),canActivate:[authGuard,AdminGuestGuard,activeGuard]},
        {path:'desarrolladoredit/:id', loadComponent:()=>import('./tablas/desarrolladores/desarrolladoredit/desarrolladoredit.component').then(c=>c.DesarrolladoreditComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
        {path:'metodopago', loadComponent:()=>import('./tablas/metodopago/metodopago.component').then(c=>c.MetodopagoComponent),canActivate:[authGuard,activeGuard]},
        {path:'metodopagoedit/:id', loadComponent:()=>import('./tablas/metodopago/metodopagoedit/metodopagoedit.component').then(c=>c.MetodopagoeditComponent),canActivate:[authGuard,AdminUserGuard,activeGuard]},
        {path:'proovedores', loadComponent:()=>import('./tablas/proovedores/proovedores.component').then(c=>c.ProovedoresComponent),canActivate:[authGuard,AdminGuestGuard,activeGuard]},
        {path:'proovedoredit/:id', loadComponent:()=>import('./tablas/proovedores/proveedoredit/proveedoredit.component').then(c=>c.ProveedoreditComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
        {path:'dlcs', loadComponent:()=>import('./tablas/dlcs/dlcs.component').then(c=>c.DlcsComponent),canActivate:[authGuard,AdminGuestGuard,activeGuard]},
        {path:'dlcedit/:id', loadComponent:()=>import('./tablas/dlcs/dlcedit/dlcedit.component').then(c=>c.DlceditComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
        {path:'clasificaciones', loadComponent:()=>import('./tablas/clasificaciones/clasificaciones.component').then(c=>c.ClasificacionesComponent),canActivate:[authGuard,activeGuard]},
        {path:'clasificacionedit/:id', loadComponent:()=>import('./tablas/clasificaciones/clasificacionedit/clasificacionedit.component').then(c=>c.ClasificacioneditComponent),canActivate:[authGuard,AdminUserGuard,activeGuard]},
        {path:'acciones', loadComponent:()=>import('./tablas/actividades/actividades.component').then(c=>c.ActividadesComponent),canActivate:[authGuard,AdminGuard,activeGuard]},
       

    ]},
    {path:'not-fount', loadComponent:()=>import('./notfound/notfound.component').then(c=>c.NotfoundComponent)},
    {path:'login', loadComponent:()=>import('./login/login.component').then(c=>c.LoginComponent)},
    {path:'register', loadComponent:()=>import('./register/register.component').then(c=>c.RegisterComponent)},
    {path: '', redirectTo: '/home', pathMatch: 'full' },
    {path: '**', redirectTo: 'not-fount', pathMatch: 'full' }
]
