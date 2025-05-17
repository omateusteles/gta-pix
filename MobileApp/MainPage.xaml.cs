using System.Timers;
using Timer = System.Timers.Timer;

namespace MobileApp;

public partial class MainPage : ContentPage {
    readonly string[] _participants = { "Ewerton", "Carla", "Luiz", "Fernanda" };
    readonly string[] _validNames = { "Carlos", "Júlio", "João", "Maria" };

    readonly Random _random = new Random();

    private Timer? _nameAnimationTimer;
    private const int NameAnimationDuration = 5000; // 5s
    private const int NameAnimationInterval = 100; // 100ms
    private int _nameAnimationElapsedTime = 0;

    public MainPage() {
        InitializeComponent();
    }

    private void OnDrawNameButtonClicked(object sender, EventArgs e) {
        DrawNameButton.IsEnabled = false;

        _nameAnimationElapsedTime = 0;
        _nameAnimationTimer = new Timer(NameAnimationInterval);
        _nameAnimationTimer.Elapsed += NameAnimationTimerElapsed;
        _nameAnimationTimer.Start();
    }

    private void NameAnimationTimerElapsed(object? sender, ElapsedEventArgs e) {
        _nameAnimationElapsedTime += NameAnimationInterval;

        MainThread.BeginInvokeOnMainThread(() => {
            NameResultLabel.Text = GetRandomName();
        });

        if (_nameAnimationElapsedTime >= NameAnimationDuration) {
            _nameAnimationTimer?.Stop();
            _nameAnimationTimer?.Dispose();

            MainThread.BeginInvokeOnMainThread(() => {
                DrawNameButton.IsEnabled = true;
                NameResultLabel.Text = DrawFinalName();
            });
        }
    }

    private string GetRandomName() {
        return _participants[_random.Next(_participants.Length)];
    }

    private string DrawFinalName() {
        return _validNames[_random.Next(_validNames.Length)];
    }
}