RegisterNetEvent('pix:auth', function(apiKey)
    local statusCode, resultData, resultHeaders, errorData = PerformHttpRequestAwait("https://72c5-2804-389-c023-61df-205d-7664-c41e-a45f.ngrok-free.app/authentication", 'GET', json.encode({
        access_token = apiKey
    }), {
        ["Content-Type"] = "application/json",
        ["access_token"] = apiKey
    })

    print("Error Code: " .. errorCode)
    print("Result Data: " .. json.encode(resultData))
    print("Result Headers: " .. json.encode(resultHeaders))
    print("Error Data: " .. json.encode(errorData))
end)

RegisterNetEvent('pix:transfer', function(apiKey, pixAddressKey, value)
    return PerformHttpRequestAwait("https://72c5-2804-389-c023-61df-205d-7664-c41e-a45f.ngrok-free.app/authentication", 'GET', json.encode({
        access_token = apiKey
    }), {
        ["Content-Type"] = "application/json",
        ["access_token"] = apiKey
    })
end)

RegisterCommand('auth', function(source, args, rawCommand)
    local apiKey = args[1]

    TriggerEvent('pix:auth', apiKey)
end, false)