# Ergänzt die Linear-GitHub-Synchronisation

Ein Cloudflare Worker, der nachträgt, was der eingebaute Abgleich zwischen Linear und GitHub nicht überträgt: von der Priorität bis zum Stand der Agenten-Arbeit.

## why

Der native Abgleich spiegelt Issues, Labels und Status. Was auf der einen Seite ein Feld und auf der anderen ein Label ist, hat dabei kein Gegenstück: Die in Linear gepflegte Priorität taucht auf GitHub nicht auf, und wenn mehrere Repositories in dasselbe Linear-Team synchronisieren, ist dort nicht erkennbar, aus welchem ein Issue stammt.

Der Worker trägt das nach. Er hört auf Linears Webhooks, gleicht bei jeder Änderung ab und schreibt, was dem jeweils anderen System fehlt: Felder werden zu Labels, Labels zu Workflow-States, die Herkunft zu einem Label am Linear-Issue.

## features

- **Priorität als Label, auf beiden Seiten** — die in Linear gesetzte Priorität wird als priority-Label auf das GitHub-Issue und das Linear-Issue geschrieben; bringt ein neues GitHub-Issue schon eines mit, füllt es umgekehrt das Linear-Feld.
- **Quell-Repository als Linear-Label** — synchronisierte Issues erhalten ein repo-Label mit Eigentümer und Name, abgeleitet aus dem Anhang des nativen Syncs.
- **Brücke zum Agenten-Workflow** — ai-Labels auf GitHub spiegeln sich in Linear-Workflow-States und auf den verknüpften Pull Requests; abgeschlossene Issues räumen ihre ai-Labels auf beiden Seiten ab.
- **Webhook plus Backstop** — ein Linear-Webhook gleicht Änderungen sofort ab, ein Lauf alle fünf Minuten fängt verlorene Ereignisse; einen eigenen Server gibt es nicht.

## scope

Ersetzt den nativen Abgleich nicht, sondern setzt ihn voraus: Issues spiegelt weiterhin Linears eigene GitHub-Integration, und die Verknüpfung der beiden Seiten stellt der Worker nicht selbst her. Er liest sie nur und trägt nach, was auf dem Weg verloren geht.
