import Hero from "./Hero";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Toaster position="top-center" />

      {/* Hero Section */}
      <Hero />
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Stats Cards */}
        {totalGoals > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Metas Totales</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <Target className="size-5 text-blue-600" />
                  {totalGoals}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Completadas</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="size-5 text-green-600" />
                  {completedGoals}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Progreso</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-purple-600" />
                  {progressPercentage.toFixed(0)}%
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        )}

        {totalGoals > 0 && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Progreso General</span>
                  <span className="text-gray-600">
                    {completedGoals} de {totalGoals} metas
                  </span>
                </div>
                <Progress value={progressPercentage} className="h-3" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add Goal Form */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="size-5" />
              Agrega una Nueva Meta
            </CardTitle>
            <CardDescription>
              Define un objetivo claro y específico que quieras alcanzar
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddGoal} className="flex gap-3">
              <Input
                type="text"
                placeholder="Ej: Leer 12 libros este año..."
                value={newGoalText}
                onChange={(e) => setNewGoalText(e.target.value)}
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="size-4 mr-2" />
                Agregar
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Goals List */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Tus Metas</CardTitle>
            <CardDescription>
              {totalGoals === 0
                ? "Aún no has agregado metas. ¡Comienza ahora!"
                : `Tienes ${totalGoals} meta${
                    totalGoals !== 1 ? "s" : ""
                  } en tu lista`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {totalGoals === 0 ? (
              <div className="text-center py-12">
                <Target className="size-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-2">
                  No tienes metas registradas
                </p>
                <p className="text-gray-400">
                  Agrega tu primera meta arriba para comenzar tu viaje
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {goals.map((goal) => (
                  <GoalItem
                    key={goal.id}
                    goal={goal}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteGoal}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 border-t border-gray-200 bg-white/50 mt-12">
        <p>Haz de cada día una oportunidad para crecer 🚀</p>
      </footer>
    </div>
  );
}
