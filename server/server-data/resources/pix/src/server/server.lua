RegisterNetEvent('pix:auth', function(apiKey)
    local playerId = source

    local statusCode, resultData, resultHeaders, errorData = PerformHttpRequestAwait("https://72c5-2804-389-c023-61df-205d-7664-c41e-a45f.ngrok-free.app/authentication", 'GET', json.encode({
        access_token = apiKey
    }), {
        ["Content-Type"] = "application/json",
        ["access_token"] = apiKey
    })

    if statusCode == 200 then
        local data = json.decode(resultData)
        local balance = data.balance

        TriggerClientEvent('pix:authResponse:success', playerId, apiKey, balance)
    else
        TriggerClientEvent('pix:authResponse:error', playerId, "Erro ao autenticar")
    end
end)

RegisterNetEvent('pix:transfer', function(_source, apiKey, pixAddressKey, value)
    local playerId = source

    local statusCode, resultData, resultHeaders, errorData = PerformHttpRequestAwait("https://72c5-2804-389-c023-61df-205d-7664-c41e-a45f.ngrok-free.app/sendPix", 'POST', json.encode({
        value = value,
        pixAddressKey = pixAddressKey,
    }), {
        ["Content-Type"] = "application/json",
        ["access_token"] = apiKey
    })

    if statusCode == 200 then
        TriggerClientEvent('pix:transferResponse:success', playerId, "Transferência realizada com sucesso")
    else
        TriggerClientEvent('pix:transferResponse:error', playerId, "Erro ao realizar transferência")
    end
end)

RegisterCommand('auth', function(source, args, rawCommand)
    local apiKey = args[1]

    TriggerEvent('pix:auth', apiKey)
end, false)

RegisterCommand('transfer', function(source, args, rawCommand)
    local apiKey = args[1]
    local pixAddressKey = args[2]
    local value = args[3]

    TriggerEvent('pix:transfer', apiKey, pixAddressKey, value)
end, false)