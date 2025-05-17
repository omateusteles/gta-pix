using System.Timers;
using Timer = System.Timers.Timer;

namespace MobileApp;

public partial class MainPage : ContentPage
{
    readonly string[] participantes = { "Ewerton", "Carla", "Luiz", "Fernanda" };
    readonly string[] nomesAleatorios = { "Carlos Pereira", "Julinho do Tráfego", "Joãozinho", "Maria das Graças" };

    readonly Random random = new Random();

    Timer? animationTimer;
    int animationDuration = 5000; // 5 segundos
    int animationInterval = 100; // 100ms
    int elapsed = 0;

    public MainPage()
    {
        InitializeComponent();
    }

    private void OnSortearClicked(object sender, EventArgs e)
    {
        SortearButton.IsEnabled = false; // desabilita botão durante animação
        ResultadoLabel.Text = "Sorteando...";

        elapsed = 0;
        animationTimer = new Timer(animationInterval);
        animationTimer.Elapsed += AnimationTimer_Elapsed;
        animationTimer.Start();
    }

    private void AnimationTimer_Elapsed(object? sender, ElapsedEventArgs e)
    {
        elapsed += animationInterval;

        // Atualiza o nome exibido rapidamente (simula scroll)
        string nomeParaMostrar = GetRandomNome();

        // Atualizar UI na thread principal
        MainThread.BeginInvokeOnMainThread(() =>
        {
            ResultadoLabel.Text = nomeParaMostrar;
        });

        if (elapsed >= animationDuration)
        {
            animationTimer?.Stop();
            animationTimer?.Dispose();

            // Nome final escolhido
            string finalNome = EscolherNomeFinal();

            MainThread.BeginInvokeOnMainThread(() =>
            {
                SortearButton.IsEnabled = true; // reabilita botão
            });
        }
    }

    private string GetRandomNome() {
        return participantes[random.Next(participantes.Length)];
    }

    private string EscolherNomeFinal() {
        return nomesAleatorios[random.Next(nomesAleatorios.Length)];
    }
}