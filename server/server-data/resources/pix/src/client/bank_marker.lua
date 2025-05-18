CreateThread(function()
	while true do
		-- draw every frame
		Wait(0)

        local markerCoords = {
            x = -54.80,
            y = -805.00,
            z = 41.20
        };

        local markerConfig = {
            type = 1,
            scale = 2.0,
            color = {
                r = 0,
                g = 48,
                b = 185,
                a = 255
            }
        };

		DrawMarker(markerConfig.type, markerCoords.x, markerCoords.y, markerCoords.z + 2, 0.0, 0.0, 0.0, 0.0, 0, 0.0, markerConfig.scale, markerConfig.scale, markerConfig.scale, markerConfig.color.r, markerConfig.color.g, markerConfig.color.b, markerConfig.color.a, false, true, 2, nil, nil, false)
	end
end)