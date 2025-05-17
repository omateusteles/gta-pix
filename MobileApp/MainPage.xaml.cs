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

        MainThread.BeginInvokeOnMainThread(() => { NameResultLabel.Text = GetRandomName(); });

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

    private Timer? _valueAnimationTimer;
    private const int ValueAnimationDuration = 5000; // 5s
    private const int ValueAnimationInterval = 100; // 100ms
    private int _valueAnimationElapsedTime = 0;

    private void OnDrawValueClicked(object sender, EventArgs e) {
        DrawValueButton.IsEnabled = false;

        _valueAnimationElapsedTime = 0;
        _valueAnimationTimer = new Timer(ValueAnimationInterval);
        _valueAnimationTimer.Elapsed += ValueAnimationTimer_Elapsed;
        _valueAnimationTimer.Start();
    }

    private int RandomSmallNumber() {
        return _random.Next(1, 100);
    }

    private string RandomDigit() {
        return _random.Next(10).ToString();
    }

    private void ValueAnimationTimer_Elapsed(object? sender, ElapsedEventArgs e) {
        _valueAnimationElapsedTime += ValueAnimationInterval;

        MainThread.BeginInvokeOnMainThread(() => {
            Value4Label.Text = RandomDigit();
            Value3Label.Text = RandomDigit();
            Value2Label.Text = RandomDigit();
            Value1Label.Text = RandomDigit();
        });

        if (_valueAnimationElapsedTime >= ValueAnimationDuration) {
            _valueAnimationTimer?.Stop();
            _valueAnimationTimer?.Dispose();

            MainThread.BeginInvokeOnMainThread(() => {
                DrawValueButton.IsEnabled = true;

                int chosenValue = RandomSmallNumber();

                Value4Label.Text = "0";
                Value3Label.Text = "0";
                Value2Label.Text = chosenValue.ToString("00")[0].ToString();
                Value1Label.Text = chosenValue.ToString("00")[1].ToString();
            });
        }
    }
}