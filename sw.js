
package com.example.miaplicacion

import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp

class MainActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        setContent {
            MaterialTheme {

                val cache = remember {
                    getSharedPreferences(
                        "MiCache",
                        Context.MODE_PRIVATE
                    )
                }

                var mensaje by remember {
                    mutableStateOf("")
                }

                var informacion by remember {
                    mutableStateOf("")
                }

                Column(
                    modifier = Modifier
                        .fillMaxSize()
                        .padding(20.dp),
                    verticalArrangement = Arrangement.spacedBy(12.dp)
                ) {

                    Text(
                        text = "Aplicación sin Internet",
                        style = MaterialTheme.typography.headlineSmall
                    )

                    OutlinedTextField(
                        value = informacion,
                        onValueChange = {
                            informacion = it
                        },
                        label = {
                            Text("Escribe información")
                        }
                    )

                    Button(onClick = {
                        cache.edit()
                            .putString("dato", informacion)
                            .apply()

                        mensaje = "Información guardada localmente"
                    }) {
                        Text("Guardar en caché")
                    }

                    Button(onClick = {
                        mensaje = cache.getString(
                            "dato",
                            "No hay información guardada"
                        ) ?: "Sin información"
                    }) {
                        Text("Consultar caché")
                    }

                    Button(onClick = {
                        cache.edit().remove("dato").apply()
                        informacion = ""
                        mensaje = "Información eliminada"
                    }) {
                        Text("Eliminar caché")
                    }

                    Text(text = mensaje)
                }
            }
        }
    }
}
