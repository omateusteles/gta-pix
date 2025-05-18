path="$(dirname "$0")/server"

mkdir "$path"
cd "$path"

echo "Para baixar o servidor FiveM, acesse:"
echo "https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/"
echo "Cole abaixo o link completo do arquivo fx.tar.xz:"
read -p "> " DOWNLOAD_URL

if [ -z "$DOWNLOAD_URL" ]; then
    echo "Erro: Link não pode estar vazio."
    exit 1
fi

echo "Baixando o servidor FiveM..."
wget -q --show-progress "$DOWNLOAD_URL" -O fx.tar.xz

if [ ! -f "fx.tar.xz" ]; then
    echo "Erro: Falha ao baixar o arquivo."
    exit 1
fi

echo "Extraindo o arquivo..."
mkdir -p temp_extract
tar xf fx.tar.xz -C temp_extract

if [ $? -ne 0 ]; then
    echo "Erro: Falha ao extrair o arquivo."
    rm -rf temp_extract fx.tar.xz
    exit 1
fi

mv temp_extract/* .
rm -rf temp_extract

rm fx.tar.xz

echo "Instalação concluída com sucesso!"
