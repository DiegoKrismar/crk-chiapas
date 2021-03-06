package com.example.myapplication3;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import androidx.appcompat.app.AppCompatActivity;
import android.provider.Settings.Secure;

public class MainActivity extends AppCompatActivity {
    private WebView webView;
    public Boolean isHelpPdf = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        /*
         *NOMBRE: onCreate
         *UTILIDAD: Instancia y configura el webView
         *ENTRADAS: Ninguna
         *SALIDAS: Ninguna
         */
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        findViewById(R.id.swipeRefreshLayout).setEnabled(false); //Eliminar el refresh

        webView = findViewById(R.id.webView);
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);

        webView.setWebChromeClient(new WebChromeClient(){});

        webView.setWebViewClient(new WebViewClient() {
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url){
                int index = url.indexOf( "/pdf/"); //Es un PDF
                int index2 = url.indexOf("/pdf/crk_help");
                isHelpPdf = false;
                if(index!= -1) { //Es un PDF abierto desde un flip
                    view.loadUrl("file:///android_asset/pdfjs/web/viewer.html?file=" + url + "#zoom=page-width"); //Abrirlo con la libreria pdfjs
                }
                if(index2!=-1) { //Es un PDF abierto desde GED
                    isHelpPdf = true;
                }
                return false;
            }
        });

        //Configuración de la webView
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true); //Habilitar el uso de JavaScript
        webSettings.setDomStorageEnabled(true); //Habilitar el uso de LocalStorage
        webSettings.setAllowUniversalAccessFromFileURLs(true); //Para el acceso a los PDFs
        webSettings.setCacheMode(WebSettings.LOAD_DEFAULT);

        //Obtener información del dispositivo, junto con el Android ID
        String apiLevel = android.os.Build.VERSION.SDK;
        String device = android.os.Build.DEVICE;
        String model = android.os.Build.MODEL;
        String product = android.os.Build.PRODUCT;
        String androidID = Secure.getString(this.webView.getContext().getContentResolver(), Secure.ANDROID_ID);

        //Redirigir a Recursos
        //webView.loadUrl("file:///android_asset/menu/index.html?apiLevel="+apiLevel+"&device="+device+"&model="+model+"&product="+product+"&androidID="+androidID); //Cargar la vista principal HTML

        //Redirigir a GED
        webView.loadUrl("file:///android_asset/menu_ged/index.html?apiLevel="+apiLevel+"&device="+device+"&model="+model+"&product="+product+"&androidID="+androidID); //Cargar la vista principal HTML
    }

    @Override
    public void onBackPressed() {
        /*
         *NOMBRE: onBackPressed
         *UTILIDAD: Retrocede de Activity al presionar 'Atras'
         *ENTRADAS: Ninguna
         *SALIDAS: Ninguna
         */
        if (webView.canGoBack()) {
            if(this.isHelpPdf){ //Si estamos en un PDF de ayuda, iniciar MainActivity al presionar onBack
                Intent startIntent = new Intent(this.webView.getContext(), MainActivity.class);
                startIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                this.webView.getContext().startActivity(startIntent);
            }else{
                webView.goBack();
            }
        } else {
            super.onBackPressed();
        }
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        /*
         *NOMBRE: onWindowFocusChanged
         *UTILIDAD: Al cambiar la visibilidad de ventana, oculta el SytemUI
         *ENTRADAS: Ninguna
         *SALIDAS: Ninguna
         */
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) { //Hide SystemUI
            View decorView = getWindow().getDecorView();
            decorView.setSystemUiVisibility(
                    View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                            | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                            | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                            | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                            | View.SYSTEM_UI_FLAG_FULLSCREEN
            );
        }
    }
}