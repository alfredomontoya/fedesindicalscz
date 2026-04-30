<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    public function __construct()
    {
        $this->middleware('auth');
        $this->middleware('admin')->except(['index']);
    }

    /**
     * Listado de roles
     */
    public function index()
    {
        $user = auth()->user();

        if ($user->isAdmin()) {
            // Admin ve todos los roles
            $roles = Role::with('users:id,name,email')
                ->latest()
                ->get();
        } else {
            // Usuario normal ve solo los roles asignados
            $roles = $user->roles()
                ->with('users:id,name,email')
                ->get();
        }

        return Inertia::render('Roles/Index', [
            'roles' => $roles,
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    /**
     * Formulario de creación
     */
    public function create()
    {
        $this->authorize('create', Role::class);

        return Inertia::render('Roles/Create');
    }

    /**
     * Guardar nuevo rol
     */
    public function store(Request $request)
    {
        $this->authorize('create', Role::class);

        $data = $request->validate([
            'nombre' => 'required|string|max:255|unique:roles,nombre',
            'descripcion' => 'nullable|string|max:1000',
        ]);

        $role = Role::create($data);

        return redirect()->route('roles.index')
            ->with('success', "Rol '{$role->nombre}' creado exitosamente.");
    }

    /**
     * Mostrar detalles del rol
     */
    public function show(Role $role)
    {
        $this->authorize('view', $role);

        $role->load('users:id,name,email');

        return Inertia::render('Roles/Show', [
            'role' => $role,
        ]);
    }

    /**
     * Formulario de edición
     */
    public function edit(Role $role)
    {
        $this->authorize('update', $role);

        $role->load('users:id,name,email');

        return Inertia::render('Roles/Edit', [
            'role' => $role,
        ]);
    }

    /**
     * Actualizar rol
     */
    public function update(Request $request, Role $role)
    {
        $this->authorize('update', $role);

        $data = $request->validate([
            'nombre' => 'required|string|max:255|unique:roles,nombre,' . $role->id,
            'descripcion' => 'nullable|string|max:1000',
        ]);

        $role->update($data);

        return redirect()->route('roles.index')
            ->with('success', "Rol '{$role->nombre}' actualizado exitosamente.");
    }

    /**
     * Eliminar rol
     */
    public function destroy(Role $role)
    {
        $this->authorize('delete', $role);

        $nombre = $role->nombre;
        $role->delete();

        return redirect()->route('roles.index')
            ->with('success', "Rol '{$nombre}' eliminado exitosamente.");
    }

    /**
     * Asignar rol a usuario
     */
    public function assignRole(Request $request, Role $role)
    {
        $this->authorize('update', $role);

        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::findOrFail($request->user_id);

        if (!$role->users()->where('users.id', $user->id)->exists()) {
            $role->users()->attach($user->id);
        }

        return back()->with('success', "Usuario '{$user->name}' asignado al rol '{$role->nombre}'.");
    }

    /**
     * Remover rol de usuario
     */
    public function removeRole(Request $request, Role $role)
    {
        $this->authorize('update', $role);

        $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $user = User::findOrFail($request->user_id);
        $role->users()->detach($user->id);

        return back()->with('success', "Usuario '{$user->name}' removido del rol '{$role->nombre}'.");
    }

    /**
     * Obtener todos los usuarios disponibles para asignar (API)
     */
    public function getAvailableUsers()
    {
        $users = User::select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        return response()->json($users);
    }

    /**
     * Obtener todos los usuarios del sistema (API)
     */
    public function getAllUsers()
    {
        $this->authorize('viewAny', Role::class);

        $users = User::with('roles:id,nombre')
            ->select('id', 'name', 'email')
            ->orderBy('name')
            ->get();

        return response()->json($users);
    }
}
