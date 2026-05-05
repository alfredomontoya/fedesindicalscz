<?php

namespace App\Providers;

use App\Models\Edificio;
use App\Models\Funcionario;
use App\Models\Listado;
use App\Models\Publication;
use App\Models\Responsable;
use App\Models\Role;
use App\Models\TypePublication;
use App\Models\User;
use App\Policies\FuncionarioPolicy;
use App\Policies\ListadoPolicy;
use App\Policies\PublicationPolicy;
use App\Policies\RolePolicy;
use App\Policies\TypePublicationPolicy;
use App\Policies\UserPolicy;
use App\Policies\ResponsablePolicy;
use Carbon\CarbonImmutable;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        Role::class => RolePolicy::class,
        User::class => UserPolicy::class,
        Publication::class => PublicationPolicy::class,
        TypePublication::class => TypePublicationPolicy::class,
        Funcionario::class => FuncionarioPolicy::class,
        Listado::class => ListadoPolicy::class,
        Responsable::class => ResponsablePolicy::class,
        // Edificio::class => EdificioPolicy::class,
    ];

    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->registerPolicies();
        $this->configureDefaults();
        $this->defineGates();
    }

    /**
     * Register the application's policies.
     */
    protected function registerPolicies(): void
    {
        foreach ($this->policies as $model => $policy) {
            Gate::policy($model, $policy);
        }
    }

    /**
     * Define authorization gates.
     */
    protected function defineGates(): void
    {
        Gate::define('admin', function ($user) {
            return $user->isAdmin();
        });
    }

    /**
     * Configure default behaviors for production-ready applications.
     */
    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null,
        );
    }
}
