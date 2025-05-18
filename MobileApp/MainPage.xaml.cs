using System.Timers;
using Timer = System.Timers.Timer;

namespace MobileApp;

public partial class MainPage {

    readonly string[] _decoyNames = { "Pokemaobr", "Marlon França", "Luísa Kinas", "Lauro Gripa", "Lygia Veny Casas" };
    readonly string[] _validNames = { "Phelipe Pereira", "Pedro Kons"};

    readonly Random _random = new Random();

    private Timer? _nameAnimationTimer;
    private Timer? _valueAnimationTimer;

    private const int NameAnimationDuration = 3000;
    private const int NameAnimationInterval = 100;
    private const int ValueAnimationDuration = 5000;
    private const int ValueAnimationInterval = 100;

    private int _nameAnimationElapsedTime = 0;
    private int _valueAnimationElapsedTime = 0;

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

    private void OnDrawValueClicked(object sender, EventArgs e) {
        DrawValueButton.IsEnabled = false;

        _valueAnimationElapsedTime = 0;
        _valueAnimationTimer = new Timer(ValueAnimationInterval);
        _valueAnimationTimer.Elapsed += ValueAnimationTimer_Elapsed;
        _valueAnimationTimer.Start();
    }

    private void NameAnimationTimerElapsed(object? sender, ElapsedEventArgs e) {
        _nameAnimationElapsedTime += NameAnimationInterval;

        MainThread.BeginInvokeOnMainThread(() => { NameResultLabel.Text = GetRandomName(); });

        if (_nameAnimationElapsedTime >= NameAnimationDuration) {
            _nameAnimationTimer?.Stop();
            _nameAnimationTimer?.Dispose();

            MainThread.BeginInvokeOnMainThread( async () => {
                DrawNameButton.IsEnabled = true;
                NameResultLabel.Text = DrawFinalName();
                scrollingSortLabel.Text = "Parabéns " + NameResultLabel.Text;

                fireworkLottie.IsVisible = true;
                await AnimateLabel();
            });
        }
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

            MainThread.BeginInvokeOnMainThread( async () => {
                DrawValueButton.IsEnabled = true;

                int chosenValue = RandomSmallNumber();

                Value4Label.Text = "0";
                Value3Label.Text = "0";
                Value2Label.Text = chosenValue.ToString("00")[0].ToString();
                Value1Label.Text = chosenValue.ToString("00")[1].ToString();
                scrollingSortLabel.Text = " VC GANHOU UM PIX DE R$ 0," + chosenValue + " CENTAVOS";
                scrollingSortLabel.TextColor = Colors.Blue;

                cashLottie.IsVisible = true;
                await AnimateLabel();
            });
        }
    }

    private async Task AnimateLabel() {
        double screenWidth = Application.Current.MainPage.Width;
        double labelWidth = scrollingSortLabel.Width;

        scrollingSortLabel.TranslationX = screenWidth + labelWidth;

        await scrollingSortLabel.TranslateTo(-labelWidth - screenWidth, scrollingSortLabel.TranslationY, 6000, Easing.Linear);
    }

    private int RandomSmallNumber() {
        return _random.Next(1, 100);
    }

    private string RandomDigit() {
        return _random.Next(10).ToString();
    }

    private string GetRandomName() {
        return _decoyNames[_random.Next(_decoyNames.Length)];
    }

    private string DrawFinalName() {
        return _validNames[_random.Next(_validNames.Length)];
    }
}